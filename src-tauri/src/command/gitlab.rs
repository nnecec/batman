use tauri_plugin_http::reqwest;

#[tauri::command]
fn fuzzy_search_gitlab(text: String) {
    println!("I was invoked from JavaScript, with this message: {}", text);
    let res = reqwest::get("http://my.api.host/data.json").await;
}
