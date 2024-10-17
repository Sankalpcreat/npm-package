import { useState, useEffect } from "react";
import PackageInfo from '@/components/PackageInfo'
import D3AreaChart from '@/components/D3AreaChart'
import ToggleChartButton from '@/components/ToogleChartButton'


const PackageDetails = ({ params }: { params: { packageName: string } }) => {

    const [packageData, setPackageData] = useState<any>(null);
    const [downloadData, setDownloadData] = useState<any[]>([]);
    const [chartType, setChartType] = useState<'weekly' | 'monthly'>('monthly');

    useEffect(() => {
        const fetchPackageDetails = async () => {
            const res = await fetch(`/api/npm-stats/${params.packageName}`);
            const data = await res.json();
            setPackageData(data);
        };
        const fetchDownloadStats = async () => {
            const res = await fetch(`/api/npm-stats/${params.packageName}/downloads?type=${chartType}`);
            const data = res.json();
            setDownloadData(data);
        }
        fetchPackageDetails();
        fetchDownloadStats();
    }, [params.packageName, chartType]);
    if (!packageData) {
        return <div>Loading...</div>
    }
    return (
        <div>
            <PackageInfo
                name={packageData.name}
                version={packageData.version}
                description={packageData.description}
                homepage={packageData.homepage}
                downloads={packageData.downloads}
            />
            <ToggleChartButton chartType={chartType} setChartType={setChartType} />
            <D3AreaChart data={downloadData} />
        </div>
    )

}

export default PackageDetails