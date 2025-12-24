import {
  CoreModule,
  GenericGapiResolversType,
  Module,
  ON_REQUEST_HANDLER,
  RESOLVER_HOOK,
} from "@gapi/core";
import { AltairModule } from "@rxdi/altair";
import { GraphqlContext } from "./app.context";
import { Request } from "@hapi/hapi";

@Module({
  imports: [
    CoreModule.forRoot({
      graphql: {
        path: "/graphql",
      },
      server: {
        hapi: {
          port: 9000,
        },
      },
    }),
    AltairModule.forRoot(),
  ],
  providers: [
    {
      provide: RESOLVER_HOOK,
      useFactory: () => (resolver: GenericGapiResolversType) => {
        const resolve = resolver.resolve.bind(resolver.target);
        resolver.resolve = async function (root, args, context, info, ...a) {
          /*
           *  Here every resolver can be modified even we can check for the result and strip some field
           *  Advanced logic for authentication can be applied here using @gapi/ac or equivalent package
           */
          return resolve(root, args, context, info, ...a);
        };
        return resolver;
      },
    },
    {
      provide: ON_REQUEST_HANDLER,
      useFactory:
        () =>
        (
          next: (context: GraphqlContext) => GraphqlContext,
          request: Request
        ) => {
          /* Every request comming from client will be processed here so we can put user context or other context here */

          console.log("Request initiated", request.payload);
          /* Fetch user and make authorization then attach context to the resolvers */
          // request.headers.authorization
          const context: GraphqlContext = {
            user: {
              id: "1",
            },
          };
          return next(context);
        },
    },
  ],
})
export class AppModule {}
