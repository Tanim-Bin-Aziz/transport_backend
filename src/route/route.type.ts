export type RouteStatus = "ACTIVE" | "INACTIVE";

export type CreateRouteInput = {
  routeName: string;
  startPoint: string;
  endPoint: string;
  status?: RouteStatus | undefined;
};

export type UpdateRouteInput = {
  routeName?: string | undefined;
  startPoint?: string | undefined;
  endPoint?: string | undefined;
  status?: RouteStatus | undefined;
};
