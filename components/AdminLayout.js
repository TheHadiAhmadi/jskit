import { Button } from "./Button.js";
import { Html } from "./Html.js";
import { Sidebar, SidebarItem } from "./Sidebar.js";
import { Style } from "./Style.js";
import { Text } from "./Text.js";
import { View } from "./View.js";

export function AdminLayout(props) {
  let items = [
    {
      icon: "home",
      title: "Pages",
      children: [
        { icon: "star", title: "Blogs", href: "/admin/pages/1" },
        { icon: "star", title: "Todos", href: "/admin/pages/2" },
        { icon: "star", title: "News", href: "/admin/pages/3" },
        { icon: "star", title: "Products", href: "/admin/pages/3" },
      ],
    },
    {
      icon: "home",
      title: "Plugins",
      href: "/admin/plugins",
    },
    {
      icon: "box",
      title: "Settings",
      href: "/admin/settings",
    },
    {
      icon: "star",
      title: "User Management",
      href: "/admin/users",
    },
  ];
  return View({
      column: true,
      style: "width: 100%",
      slot: [
        View({
          justify: "betwen",
          align: "center",
          p: 3,
          style: "width: 100%; height: 56px; border-bottom: 1px solid gray",
          slot: [
            Text({ text: "UBuilder", tag: "h3", style: "margin: 0" }),
            Button({
              style: "margin-left: auto",
              slot: "Logout",
              href: "/",
            }),
          ],
        }),
        View({
          'u-admin': function(el) {
            async function fetchPartial(pathname) {
              const page = await fetch(pathname).then(res => res.text())
              console.log(page)
              // document.querySelector('html').innerHTML = page
            }
            
            function findAnchorTag(element) {
              if (element.tagName === 'HTML') return null;
              if (element.tagName === 'A') return element;
              else return findAnchorTag(element.parentElement);
            }
  
            el.addEventListener('click', event => {            
              const clickTarget = event.target;
              const anchorTag = findAnchorTag(clickTarget);
  
  
  
              if (!anchorTag) return;
              if (anchorTag.target) return;
              if (anchorTag.hasAttribute('no-routing')) return;
              // event.preventDefault();
              // const targetLocation = anchorTag.href;
              // const targetPathname = new URL(targetLocation).pathname;
  
              // history.pushState({}, undefined, targetPathname);
  
              // fetchPartial(targetPathname);
            });
          },
          slot: [
            Sidebar({
              slot: items.map((item) =>
                SidebarItem({
                  title: item.title,
                  href: item.href,
                  slot:
                    item.children &&
                    item.children.map((child) =>
                      SidebarItem({
                        title: child.title,
                        href: child.href,
                        active: child.active,
                      })
                    ),
                })
              ),
            }),
            View({
              'u-body': true,
              style:
                "width: 100%; margin-left: 240px; overflow: auto; height: calc(100vh - 56px)",
              slot: props.slot,
            }),
          ],
        }),
      ],
  });
}
