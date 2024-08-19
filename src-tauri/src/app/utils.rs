use tauri::{AppHandle, Emitter};

#[derive(Debug, serde::Serialize)]
struct Navigation {
    to: String,
}

#[tauri::command]
pub fn navigate(app: &AppHandle, to: String) {
    let message: Navigation = Navigation { to };
    app.emit("navigate", &message).unwrap();
}
