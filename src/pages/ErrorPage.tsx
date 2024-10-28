import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error("error", error);

  const isHttpError = (
    error: any,
  ): error is { statusText?: string; message?: string } =>
    error &&
    typeof error === "object" &&
    ("statusText" in error || "message" in error);

  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred salut.</p>
      <p>
        <i>
          {isHttpError(error)
            ? error.statusText || error.message
            : "An unknown error occurred"}
        </i>
      </p>
    </div>
  );
}
