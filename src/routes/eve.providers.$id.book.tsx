import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/eve/providers/$id/book")({
  beforeLoad: ({ params }) => {
    throw redirect({
      to: "/eve/providers/$id",
      params: { id: params.id },
      search: { book: 1 },
    });
  },
});
