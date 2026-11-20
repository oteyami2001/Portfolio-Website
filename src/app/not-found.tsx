import Link from "next/link";

export default function NotFound() {
  return (
    <section className="container-site flex min-h-[70vh] flex-col items-start justify-center pt-24">
      <p className="font-mono text-sm text-cyan-300">HTTP 404 · ResourceNotFoundException</p>
      <h1 className="mt-4 font-display text-5xl font-semibold text-white">This resource isn&apos;t provisioned.</h1>
      <p className="lead mt-4 max-w-xl">The page you requested doesn&apos;t exist — it may have been moved or decommissioned.</p>
      <Link href="/" className="btn-primary mt-8">Back to home</Link>
    </section>
  );
}
