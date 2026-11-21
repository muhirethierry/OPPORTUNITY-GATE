type PageStubProps = {
  title: string
}

export default function PageStub({ title }: PageStubProps) {
  return (
    <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
      <p className="mt-4 text-slate-600">This page is under construction.</p>
    </section>
  )
}