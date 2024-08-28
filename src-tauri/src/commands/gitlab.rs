use std::path::PathBuf;

use gitlab::api::{self, groups, projects, Query};
use gitlab::Gitlab;
use serde::Deserialize;
use serde_json::json;
use tauri::{AppHandle, Manager, Wry};
use tauri_plugin_store::{with_store, StoreCollection};

#[derive(Debug, Deserialize)]
struct Project {
    name: String,
}

#[tauri::command]
pub fn fuzzy_gitlab_search(app_handle: AppHandle, text: String) {
    println!("I was invoked from JavaScript, with this message: {}", text);

    let stores = app_handle.state::<StoreCollection<Wry>>();

    let path = PathBuf::from("setting.bin");

    let setting = with_store(app_handle.clone(), stores, path, |store| {
        let value = store.get("gitlab").expect("Failed to get value from store");

        let host = value["host"].as_str().unwrap();
        let access_token = value["accessToken"].as_str().unwrap();

        let client = match Gitlab::new(host, access_token) {
            Ok(client) => {
                let pageable_endpoint = projects::Projects::builder()
                    .order_by(projects::ProjectOrderBy::UpdatedAt)
                    .sort(api::common::SortOrder::Descending)
                    .build()
                    .unwrap();
                let first_page: Vec<Project> = pageable_endpoint.query(&client).unwrap();

                println!("first_page {:?}", first_page);
            }
            Err(error) => {
                println!("error {:?}", error);
            }
        };

        Ok(())
    })
    .unwrap();
}
