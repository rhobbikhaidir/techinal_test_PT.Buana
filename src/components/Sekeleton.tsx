
const Sekeleton = () => (
  <div className='rounded-md p-4'>
    <div className='animate-pulse flex space-x-4'>
      <div className=' bg-slate-700 h-80 w-80' />
      <div className='flex-1 space-y-6 py-1'>
        <div className='h-2 bg-slate-700 rounded' />
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => (
          <div className='space-y-3' key={item}>
            <div className='h-2 bg-slate-700 rounded' />
          </div>
        ))}
      </div>
    </div>
  </div>
)

export default Sekeleton
