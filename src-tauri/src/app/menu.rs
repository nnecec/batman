use tauri::{
    menu::{Menu, SubmenuBuilder},
    Wry,
};

// --- Menu
pub fn init(app: &tauri::App) -> tauri::Result<Menu<Wry>> {
    let handle = app.handle();
    let menu = Menu::new(handle)?;

    let name = "Batman";
    let app_menu = SubmenuBuilder::new(handle, name)
        .text("name", name)
        .separator()
        .text("Preferences", "Preferences...")
        .text("check_for_updates", "Check for Updates")
        .services()
        .hide()
        .hide_others()
        .show_all()
        .separator()
        .quit()
        .build()?;

    menu.append(&app_menu)?;
    Ok(menu)
}
