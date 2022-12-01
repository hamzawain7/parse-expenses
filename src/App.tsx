import {ChangeEventHandler, useMemo, useState} from "react";
import "./App.css";
import styles from "./App.module.scss";
import {getTotalExpenseAmount, parseExpenseText} from "./utils/expense-parser";
import ReactJson from "react-json-view";
import {AgGridReact} from "ag-grid-react";
import {VENDOR_NAME_HASHMAP, VENDOR_TYPE} from "./utils/vendor-utils";

function App() {
    const [inputTextVal, setInputTextVal] = useState('');

    const onTextInputChange: ChangeEventHandler<HTMLInputElement> = (evt) => {
        const val = evt.target.value;
        setInputTextVal(val);
    }

    console.log(parseExpenseText(inputTextVal));

    const getColumns = () => {
        let columns = [];
        for (let [vendorType,] of Object.entries(VENDOR_TYPE)) {
            columns.push({
                field: vendorType
            })
        }
        console.log(columns);
        return columns;
    }

    const defaultColDef = useMemo(() => ({
        resizable: true,
        sortable: true
    }), []);

    const getRows = () => {
        return [];
    }

    console.log(parseExpenseText(inputTextVal), getTotalExpenseAmount(inputTextVal));
    return (
        <div className="App">
            <div className={styles.app}>
                <input
                    className={styles.textInput}
                    type="text"
                    value={inputTextVal}
                    onChange={onTextInputChange}
                />
                {/*<div className={`ag-theme-alpine ${styles.detailsContainer}`} >*/}
                <AgGridReact
                    rowData={getRows()}
                    columnDefs={getColumns()}
                    suppressRowClickSelection={true}
                    defaultColDef={defaultColDef}
                />
                {/*</div>*/}
            </div>
        </div>
    );
}

export default App;
