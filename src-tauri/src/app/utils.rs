use tauri::Emitter;

#[derive(Debug, serde::Serialize)]
struct Navigation {
    to: String,
}

#[tauri::command]
pub fn navigate(window: tauri::Window, to: String) {
    let message: Navigation = Navigation { to };
    window.emit("navigate", &message).unwrap();
}
