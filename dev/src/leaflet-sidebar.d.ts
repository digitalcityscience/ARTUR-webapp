import * as L from "leaflet";

declare module "leaflet" {
  namespace control {
    function sidebar(options: {
      container: string;
      position: string;
      closebutton?: boolean;
    }): L.Control.Sidebar;
  }

  namespace Control {
    interface Sidebar extends L.Control {
      open(panelId: string): this;
      close(): this;
      addPanel(panel: SidebarPanel): this;
      removePanel(panelId: string): this;
    }
  }

  interface SidebarPanel {
    id: string;
    tab: string;
    title: string;
    pane: string;
    position?: string;
  }
}
