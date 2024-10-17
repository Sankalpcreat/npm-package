import Searchbar from '@/components/SearchBar'

const NpmStatsPage=()=>{
  return (
    <div className='container mx-auto bg-center p-4'>
      <h1 text-3xl font-bold mb-4>NPM package Search</h1>
      <Searchbar/>
    </div>
  )
}
export default NpmStatsPage;