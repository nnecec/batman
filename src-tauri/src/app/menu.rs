use tauri::{
    menu::{Menu, MenuEvent, MenuItem, MenuItemBuilder, SubmenuBuilder},
    AppHandle, Wry,
};

use crate::app;

pub fn handle_menu_event(app: &AppHandle, event: MenuEvent) {
    match event.id().0.as_str() {
        "settings" => {
            println!("click settings");
            app::utils::navigate(&app, String::from("/settings"));
        }
        _ => {}
    }
}

// --- Menu
pub fn init(app: &tauri::App) -> tauri::Result<Menu<Wry>> {
    let handle = app.handle();
    let menu = Menu::new(handle)?;

    let name = "Batman";
    let app_menu = SubmenuBuilder::new(handle, name)
        .item(&MenuItem::new(handle, "Batman", true, None::<&str>)?)
        .separator()
        .item(
            &MenuItemBuilder::new("Settings...")
                .id("settings")
                .accelerator("CmdOrCtrl+,")
                .build(handle)?,
        )
        .text("check_for_updates", "Check for Updates")
        .separator()
        .services()
        .separator()
        .hide()
        .hide_others()
        .show_all()
        .separator()
        .quit()
        .build()?;

    let edit_menu = SubmenuBuilder::new(handle, "Edit")
        .undo()
        .redo()
        .separator()
        .cut()
        .copy()
        .paste()
        .separator()
        .select_all()
        .build()?;

    menu.append(&app_menu)?;
    menu.append(&edit_menu)?;
    Ok(menu)
}
