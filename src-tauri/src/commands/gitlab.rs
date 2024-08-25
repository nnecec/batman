use std::path::PathBuf;

use serde_json::json;
use tauri::{AppHandle, Manager, Wry};
use tauri_plugin_store::{with_store, StoreCollection};

#[tauri::command]
pub fn fuzzy_gitlab_search(app_handle: AppHandle, text: String) {
    println!("I was invoked from JavaScript, with this message: {}", text);

    let stores = app_handle.state::<StoreCollection<Wry>>();

    let path = PathBuf::from("setting.bin");

    let setting = with_store(app_handle.clone(), stores, path, |store| {
        // Get a value from the store.

        let value = store.get("gitlab").expect("Failed to get value from store");
        println!("value {} host {}", value, value.get("host").unwrap());

        Ok(())
    })
    .unwrap();
}
