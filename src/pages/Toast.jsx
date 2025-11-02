export default function Toast({type='info', children}) {
  const bg = type==='error' ? 'bg-red-500' : 'bg-primary';
  return <div className={`fixed right-6 bottom-6 text-white px-4 py-2 rounded ${bg}`}>{children}</div>
}
