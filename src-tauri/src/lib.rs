mod app;
mod commands;
use app::menu;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_shell::init())
        .plugin(tauri_plugin_clipboard_manager::init())
        .plugin(tauri_plugin_store::Builder::new().build())
        .invoke_handler(tauri::generate_handler![
            commands::gitlab::fuzzy_gitlab_search
        ])
        .setup(move |app| {
            app.set_menu(menu::init(app)?);
            app.on_menu_event(move |app, event| {
                menu::handle_menu_event(app, event);
            });
            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
