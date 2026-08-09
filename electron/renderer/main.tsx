import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  createMemoryHistory,
  createRootRoute,
  createRoute,
  createRouter,
  Outlet,
  RouterProvider,
} from "@tanstack/react-router";
import { PriceList } from "@/components/PriceList";
import { ItemDetail } from "@/components/ItemDetail";
import { getItem } from "@/data/items";
import "@/styles.css";

const rootRoute = createRootRoute({ component: () => <Outlet /> });

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: PriceList,
});

const detailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/produkt/$slug",
  component: function DesktopDetail() {
    const { slug } = detailRoute.useParams();
    const item = getItem(slug);
    if (!item) return <p className="p-10 text-center text-sm">Brak przedmiotu.</p>;
    return <ItemDetail item={item} />;
  },
});

const router = createRouter({
  routeTree: rootRoute.addChildren([indexRoute, detailRoute]),
  history: createMemoryHistory({ initialEntries: ["/"] }),
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
