import React, { useState } from "react";
import { Download, FileSpreadsheet, CheckCircle } from "lucide-react";
import * as XLSX from "xlsx";

const ExcelDataConverter = () => {
  const [isConverted, setIsConverted] = useState(false);

  const rawData = `0.11584936333333333	EntityGenerator1_3	417.057708	170.82378214265822	0.0
0.2630938886111111	EntityGenerator1_5	947.1379989999999	240.39486954316746	0.0
0.490841865	EntityGenerator1_8	1767.030714	262.950305479534	0.0
0.6469586247222221	EntityGenerator1_9	2329.0510489999997	255.68621757731395	0.0
0.7200089347222223	EntityGenerator1_10	2592.032165	166.22693628031766	16.260869
0.7996534108333333	EntityGenerator1_11	2878.752279	317.07313409089437	223.167048
0.9820209516666666	EntityGenerator1_15	3535.2754259999997	286.4499845705983	0.0
1.0699575	EntityGenerator1_16	3851.8469999999998	205.31149402081766	51.304901
1.1283482555555555	EntityGenerator1_17	4062.05372	222.10687413789702	196.40308399999998
2.16371002	EntityGenerator1_24	7789.356072	229.48430578755406	0.0
2.471149925833333	EntityGenerator1_25	8896.139733	322.374739646447	0.0
2.644421684444444	EntityGenerator1_26	9519.918064	317.06514151183126	0.0
2.929225688888889	EntityGenerator1_28	10545.21248	231.2380538990075	0.0
2.9921736541666664	EntityGenerator1_29	10771.825154999999	162.05335778336445	201.33157
3.0743420927777776	EntityGenerator1_33	11067.631534	212.81282013829997	38.209005
3.2331074405555555	EntityGenerator1_36	11639.186786	289.58202877736176	0.0
3.5771636433333334	EntityGenerator1_41	12877.789116	184.2467452626213	0.0
3.6593557808333332	EntityGenerator1_42	13173.680811	297.3034244705816	219.978711
3.7110712966666664	EntityGenerator1_43	13359.856667999999	164.2847794082782	224.862283
3.8047208302777773	EntityGenerator1_47	13696.994988999999	204.2174652503126	0.0
3.8599648777777777	EntityGenerator1_48	13895.87356	297.54278391747414	121.30945899999999
4.035221820555555	EntityGenerator1_50	14526.798553999997	165.2341164530326	0.0
4.4407166091666666	EntityGenerator1_54	15986.579792999999	277.5045166323698	0.0
4.5096606375	EntityGenerator1_55	16234.778294999998	237.3464590706683	0.0
4.671955308888888	EntityGenerator1_56	16819.039112	169.39458084246195	0.0
4.763747234999999	EntityGenerator1_58	17149.490046	226.23677936727103	0.0
4.922724480277778	EntityGenerator1_60	17721.808129	197.73598092681033	0.0
5.041678227777778	EntityGenerator1_61	18150.04162	220.5765687357674	0.0
5.113997455	EntityGenerator1_62	18410.390838	229.2423093702148	171.333241
5.185964273333333	EntityGenerator1_63	18669.471384	190.1132235218429	300.870298
5.247299837777777	EntityGenerator1_64	18890.279415999998	217.7493958974036	547.889993
5.370045514166666	EntityGenerator1_70	19332.163850999998	241.210235125441	0.0
5.428082845	EntityGenerator1_72	19541.098242	265.776498931447	33.926874999999995
5.507478357777778	EntityGenerator1_73	19826.922088	265.9597338460411	234.50515099999998
5.5728341030555555	EntityGenerator1_75	20062.202771	159.0239242144021	313.678759
5.738320441388889	EntityGenerator1_77	20657.953589	255.61563170081112	0.0
5.906152840277777	EntityGenerator1_80	21262.150224999998	342.92180679806506	0.0
5.974309520555555	EntityGenerator1_81	21507.514273999997	207.22021296530096	0.0
6.364743309444444	EntityGenerator1_89	22913.075913999997	234.3428483829618	0.0
6.750007661111111	EntityGenerator1_91	24300.027579999998	301.7971644876494	0.0
6.845540209166667	EntityGenerator1_93	24643.944753	190.80548355730917	234.312631
6.928954575	EntityGenerator1_94	24944.23647	299.1788793784833	311.661547
7.005813862777777	EntityGenerator1_96	25220.929905999998	303.5034646434091	392.679662
7.057952869444445	EntityGenerator1_97	25408.63033	247.1184119827285	666.617275
7.123528101944444	EntityGenerator1_98	25644.701167	198.25443471948145	0.425894
7.265215198611111	EntityGenerator1_100	26154.774715	217.08995954038122	0.0
7.557942949722222	EntityGenerator1_103	27208.594619	237.44245050851163	0.0
7.694389280555556	EntityGenerator1_104	27699.80141	352.2431650138476	0.0
7.791514635833333	EntityGenerator1_106	28049.452688999998	201.3429615872654	0.0
7.867569361666666	EntityGenerator1_107	28323.249701999997	314.6131471775112	153.023045`;

  const parseData = () => {
    const lines = rawData.trim().split("\n");
    const parsedData = lines.map((line) => {
      const parts = line.trim().split(/\s+/);
      return {
        "SimTime/1[h]": parseFloat(parts[0]),
        Customer: parts[1],
        "SimTime/1[h]*3600": parseFloat(parts[2]),
        "ServiceTime/1[h]*3600": parseFloat(parts[3]),
        'StateTimes("Waiting")/1[h]*3600': parseFloat(parts[4]),
      };
    });
    return parsedData;
  };

  const downloadExcel = () => {
    const data = parseData();

    // Create worksheet
    const ws = XLSX.utils.json_to_sheet(data);

    // Set column widths
    ws["!cols"] = [
      { wch: 18 },
      { wch: 15 },
      { wch: 20 },
      { wch: 25 },
      { wch: 30 },
    ];

    // Create workbook
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Customer Data");

    // Generate Excel file and download
    XLSX.writeFile(wb, "customer_simulation_data.xlsx");
    setIsConverted(true);

    setTimeout(() => setIsConverted(false), 3000);
  };

  const data = parseData();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <FileSpreadsheet className="w-8 h-8 text-indigo-600" />
              <h1 className="text-3xl font-bold text-gray-800">
                Data Simulasi Customer
              </h1>
            </div>
            <button
              onClick={downloadExcel}
              className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors shadow-md"
            >
              {isConverted ? (
                <>
                  <CheckCircle className="w-5 h-5" />
                  Download Berhasil!
                </>
              ) : (
                <>
                  <Download className="w-5 h-5" />
                  Download Excel
                </>
              )}
            </button>
          </div>

          <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>Total Data:</strong> {data.length} customer |
              <strong className="ml-4">Format:</strong> Excel (.xlsx) |
              <strong className="ml-4">Kompatibel:</strong> Excel, SPSS, dan
              software spreadsheet lainnya
            </p>
          </div>

          <div className="overflow-x-auto border border-gray-200 rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-indigo-600">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">
                    SimTime/1[h]
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">
                    SimTime/1[h]*3600
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">
                    ServiceTime/1[h]*3600
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">
                    StateTimes("Waiting")/1[h]*3600
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {data.slice(0, 20).map((row, index) => (
                  <tr
                    key={index}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                      {row["SimTime/1[h]"].toFixed(6)}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-indigo-600">
                      {row["Customer"]}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                      {row["SimTime/1[h]*3600"].toFixed(2)}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                      {row["ServiceTime/1[h]*3600"].toFixed(2)}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                      {row['StateTimes("Waiting")/1[h]*3600'].toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {data.length > 20 && (
            <div className="mt-4 text-center text-sm text-gray-600">
              Menampilkan 20 dari {data.length} baris. Download Excel untuk
              melihat semua data.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExcelDataConverter;
