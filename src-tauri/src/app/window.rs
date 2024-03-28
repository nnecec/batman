use tauri::Window;

pub fn get_preferences_window() -> tauri::Window {
    Window::new(
        tauri::generate_context!(),
        "preferences",
        tauri::WindowUrl::App("preferences".into()),
    )
    .build()
    .unwrap()
}
