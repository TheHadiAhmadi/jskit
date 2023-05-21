import { AdminLayout } from "../../components/AdminLayout.js";

import {
  
  Button,
  ButtonList,
  Card,
  CardActions,
  CardBody,
  CardFooter,
  Text,
} from "../../components/index.js";
import { Page } from "../../components/Page.js";

function PluginCard({ toggle, title, description, active }) {
  return Card({
    slot: [
      CardBody({
        slot: [Text({ tag: "h3", text: title }), Text({ text: description })],
      }),
      CardFooter({
        slot: CardActions({
          slot: ButtonList({
            slot: [
              active
                ? Button({ slot: "Disable" })
                : Button({
                    slot: "Active",
                    color: "primary",
                  }),
              Button({ slot: "Remove", color: "danger" }),
            ],
          }),
        }),
      }),
    ],
  });
}

export default () => {
  let plugins = [
    {
      id: 1,
      title: "SEO Plugin",
      description:
        "Improve your website's search engine optimization with this powerful plugin.",
      active: true,
    },
    {
      id: 2,
      title: "Social Media Plugin",
      description:
        "Easily share your content on social media platforms with this plugin.",
      active: false,
    },
    {
      id: 3,
      title: "Analytics Plugin",
      description:
        "Track your website's traffic and user behavior with this plugin.",
      active: true,
    },
    {
      id: 4,
      title: "Contact Form Plugin",
      description:
        "Add a customizable contact form to your website with this plugin.",
      active: true,
    },
    {
      id: 5,
      title: "E-commerce Plugin",
      description:
        "Sell products and services directly from your website with this powerful e-commerce plugin.",
      active: false,
    },
  ];

  function togglePlugin(pluginId) {
    plugins = plugins.map((plugin) => {
      if (plugin.id === +pluginId) {
        return { ...plugin, active: !plugin.active };
      }
      return plugin;
    });
  }

  return Page({
    layout: AdminLayout,
    title: "Plugins",
    actions: ButtonList({
      slot: [
        Button({
          slot: "Install from File",
          color: "secondary",
        }),
        Button({
          slot: "Search Marketplace",
          color: "primary",
        }),
      ],
    }),
    body: plugins.map((plugin) =>
      PluginCard({
        toggle: () => togglePlugin(plugin.id),
        active: plugin.active,
        title: plugin.title,
        description: plugin.description,
      })
    ),
  });
};
