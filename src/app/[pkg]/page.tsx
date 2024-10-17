'use client'

import NPMChart from '@/components/NPMChart'
import ColorPicker from '@/components/ColorPicket'
import {useFetchData} from  '@/hooks/useFetchData'

export default function PackagePage({params}:{params:{pkg:string}}){
    const pkgName=params.pkg
  const {data,pending} =useFetchData(`/api/${pkgName}`)


if(pending) return <p>Loading...</p>

return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between">
        <button onClick={() => router.push('/')} className="btn btn-link">Search another package</button>
        <ColorPicker />
      </div>
      <h1 className="text-2xl font-bold">
        {data?.name || pkgName}
        <a href={`https://npmjs.com/package/${data?.name}`} target="_blank" className="text-sm text-gray-400 ml-2">v{data?.version}</a>
      </h1>
      <p>{data?.description}</p>
      <a href={data?.homepage} target="_blank" className="text-primary hover:underline">{data?.homepage}</a>
      <NPMChart data={data?.downloads} total={data?.total} />
    </div>
  );
}