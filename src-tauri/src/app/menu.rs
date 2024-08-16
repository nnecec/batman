use tauri::{
    menu::{AboutMetadata, Menu, MenuEvent, MenuId, MenuItem, MenuItemBuilder, SubmenuBuilder},
    AppHandle, Manager, Wry,
};

use crate::app;

pub fn handle_menu_event(window: &AppHandle, event: MenuEvent) {
    match event.id().0.as_str() {
        "preferences" => {
            println!("click preferences");
            app::utils::navigate(window, String::from("/preferences"));
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
            &MenuItemBuilder::new("Preferences...")
                .id("preferences")
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

    menu.append(&app_menu)?;
    Ok(menu)
}
