
import { deleteData, setData } from "store/index";
import { RootState } from "main";
import { useDispatch, useSelector } from "react-redux";
import Papa from "papaparse";

const Table: React.FC = () => {
    const dispatch = useDispatch();
    const columns = ['name', 'price', 'quantity'];
    const data = useSelector((state: RootState) => state.crud.data);
    const exportDataToCSV = () => {
        const csv = Papa.unparse(data);
        const csvBlob = new Blob([csv], { type: "text/csv" });
        const csvUrl = URL.createObjectURL(csvBlob);
        const link = document.createElement("a");
        link.href = csvUrl;
        link.download = "product_data.csv";
        link.click();
        URL.revokeObjectURL(csvUrl);
    };
    return (
        <>
            <table className='custom_table' style={{ width: '100%' }}>
                <thead>
                    <tr>
                        {columns.map((column) => (
                            <th key={column}>{column}</th>
                        ))}
                        <th className='custom_width d-flex'>Actions
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((row) => (
                        <tr key={row.id}>
                            {columns.map((column) => (
                                <td key={column}>{(row as never)[column]}</td>
                            ))}
                            <td className='custom_width'>
                                <div className='d-flex buttons_container'>
                                    <button onClick={() => dispatch(setData({ data: row }))} className='editButton'>
                                        Edit
                                    </button>
                                    <button className='deleteButton'
                                        onClick={() => dispatch(deleteData({ id: row.id }))}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {
                data.length > 0 &&<button className="customExport" onClick={() => exportDataToCSV()}>Export to CSV</button>
            }
        </>
    )
}

export default Table