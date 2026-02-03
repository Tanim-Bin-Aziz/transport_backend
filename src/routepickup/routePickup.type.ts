export type CreateRoutePickupInput = {
  routeId: number;
  pickupPointId: number;
  stopOrder: number;
};

export type UpdateRoutePickupInput = {
  stopOrder: number;
};
