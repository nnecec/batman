use std::error::Error;

use gitlab::{
    api::{common, projects, Query},
    Gitlab,
};
use serde::{Deserialize, Serialize};
use serde_json::json;
use tauri::{AppHandle, Manager, Wry};
use tauri_plugin_store::{Store, StoreBuilder};

#[derive(Debug, Deserialize)]
struct Project {
    name: String,
}

#[derive(Debug, Clone)]
pub struct GitlabSetting {
    pub host: String,
    pub access_token: String,
}

fn load_from_store<R: tauri::Runtime>(
    store: &Store<R>,
) -> Result<GitlabSetting, Box<dyn std::error::Error>> {
    let gitlab_setting = store.get("gitlab").expect("Failed to get value from store");

    let host = gitlab_setting["host"].to_string();
    let access_token = gitlab_setting["accessToken"].to_string();

    println!(
        "host: {}, access_token: {}, string to str: {}",
        host,
        gitlab_setting["host"].as_str().unwrap(),
        host.as_str()
    );

    Ok(GitlabSetting { host, access_token })
}

fn get_gitlab_client(app_handle: AppHandle) -> Result<Gitlab, Box<(dyn Error + 'static)>> {
    let mut store = StoreBuilder::new("setting.bin").build(app_handle.clone());

    let _ = store.load();

    match load_from_store(&store) {
        Ok(setting) => {
            println!(
                "Setting loaded: {:?}, host: {}, as str: {}",
                setting,
                setting.host,
                setting.host.as_str()
            );
            Ok(Gitlab::new(setting.host, setting.access_token).unwrap())
        }
        Err(err) => {
            eprintln!("Error loading settings: {}", err);
            Err(err)
        }
    }
}

#[tauri::command]
pub fn fuzzy_gitlab_search(app_handle: AppHandle, text: String) {
    println!("I was invoked from JavaScript, with this message: {}", text);
    let client = get_gitlab_client(app_handle).unwrap();

    let pageable_endpoint = projects::Projects::builder().build().unwrap();
    let first_page: Vec<Project> = pageable_endpoint.query(&client).unwrap();

    println!("first_page {:?}", first_page);

    // let pageable_endpoint = projects::Projects::builder()
    //     .order_by(projects::ProjectOrderBy::UpdatedAt)
    //     .sort(api::common::SortOrder::Descending)
    //     .build()
    //     .unwrap();
    // let first_page: Vec<Project> = pageable_endpoint.query(&client).unwrap();

    // println!("first_page {:?}", first_page);
}
