const routes = {
  home: "/",
  signup: "/signup",
  room: (roomId: string) => `/room/${roomId}`,
};

export default routes;
