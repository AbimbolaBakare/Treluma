import { Suspense } from "react";
import ResultsPage from "@/components/ResultsPage";
import Loader from "@/components/ui/Loader/PageLoader";

export default function Result() {
  return (
    <Suspense fallback={<Loader message="Loading results..." />}>
      <ResultsPage />
    </Suspense>
  );
}
