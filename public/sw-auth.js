import { registerRoute } from "workbox-routing/registerRoute.mjs";
import { NetworkFirst } from "workbox-strategies/NetworkFirst.mjs";
import FirebaseAuthPlugin from "workbox-plugin-firebase-auth";

registerRoute(
  /\.(?:png|gif|jpg|jpeg|svg)$/,
  new NetworkFirst({
    cacheName: "authorizedApi",
    plugins: [
      new FirebaseAuthPlugin({
        firebase: {
          config: {
            /* your firebase config */
          },
        },
      }),
    ],
  })
);
