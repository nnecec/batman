use std::f32::consts::E;

use gitlab::Gitlab;
use serde::Deserialize;
use serde_json::json;
use tauri::{AppHandle, Manager, Wry};
use tauri_plugin_store::{Store, StoreBuilder};

#[derive(Debug, Clone)]
pub struct GitlabSetting {
    pub host: String,
    pub access_token: String,
}

fn load_from_store<R: tauri::Runtime>(
    store: &Store<R>,
) -> Result<GitlabSetting, Box<dyn std::error::Error>> {
    let host = store
        .get("gitlab.host")
        .and_then(|v| v.as_str())
        .map(|s| s.to_string())
        .unwrap_or_else(|| "".to_string());

    let access_token = store
        .get("gitlab.accessToken")
        .and_then(|v| v.as_str())
        .map(|s| s.to_string())
        .unwrap_or_else(|| "".to_string());

    Ok(GitlabSetting { host, access_token })
}

fn get_gitlab_client(app_handle: AppHandle) {
    let mut store = StoreBuilder::new("setting.bin").build(app_handle.clone());

    let _ = store.load();

    let settings = load_from_store(&store);
    match settings {
        Ok(settings) => Gitlab::new(settings.host, settings.access_token),
        Err(err) => {
            eprintln!("Error loading settings: {}", err);
            // Handle the error case if needed
            Err(err)
        }
    }
}

#[tauri::command]
pub fn fuzzy_gitlab_search(app_handle: AppHandle, text: String) {
    println!("I was invoked from JavaScript, with this message: {}", text);
    let client = get_gitlab_client(app_handle);

    // let pageable_endpoint = projects::Projects::builder()
    //     .order_by(projects::ProjectOrderBy::UpdatedAt)
    //     .sort(api::common::SortOrder::Descending)
    //     .build()
    //     .unwrap();
    // let first_page: Vec<Project> = pageable_endpoint.query(&client).unwrap();

    // println!("first_page {:?}", first_page);
}
