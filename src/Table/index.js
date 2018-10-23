import React from 'react';
import styled from 'styled-components';
import { findDOMNode } from 'react-dom'

const HEADER = ['Name', 'Role','Country', ''];

class Table extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            data: [],
            isEditable: {}
        };
    }

    componentDidMount() {
        this.setState({
            data: this.props.data
        });
    }

    onRemove = (rowIndex) => {
        const { data } = this.state;
        this.setState({
            data: data.filter((d, i) => rowIndex != i)
        })
    };

    onEdit = (rowIndex) => {
        this.setState(prevState => {
            const {isEditable} = {...prevState};
            isEditable[rowIndex] = !isEditable[rowIndex]
            return { isEditable };
        });
    }

    onUpdate = (rowIndex) => ({key, value}) => {
        const {data} = {...this.state};
        data[rowIndex][key] = value;
        this.setState({
            data
        })
    }

    onSave = (row) => {
        this.setState(prevState => ({
            data: [...prevState.data, row]
        }));
    }

    render () {
        console.log(data);
        const { data, isAdded, isEditable } = this.state;
        return (
            <div>
                <TableContainer>
                    <tbody>
                        <Header data={HEADER}/>
                        <TableRow
                            data={data}
                            onRemove={this.onRemove}
                            onEdit={this.onEdit}
                            onUpdate={this.onUpdate}
                            onSave={this.onSave}
                            isEditable={isEditable}
                            />
                    </tbody>
                </TableContainer>
            </div>
            );
    }
}

const Header = ({data}) => (
    <tr>
        {data.map((title, i) => <th key={i}>{title}</th>)}
    </tr>
);

const TableRow = ({data, onRemove, onSave, onEdit, onUpdate, isEditable, isAdded}) => {
    return (
    <React.Fragment>
    <AddRow onSave={(row) => onSave(row)}/>
    {data.map((v, i) =>
            <React.Fragment>
                <tr key={i}>
                    <td>{v.name}</td>
                    <td>{v.role}</td>
                    <td>{v.country}</td>
                    <td>
                        <button type="button" onClick={() => onRemove(i)}>Remove</button>
                        <button type="button" onClick={() => onEdit(i)}>Edit</button>
                    </td>
                </tr>
                {isEditable[i] && <EditRow row={data[i]} onUpdate={ onUpdate(i)}/> }
            </React.Fragment>
    )}
    </React.Fragment>);
};

const EditRow = ({row, onUpdate}) => {

return (
    <tr >
        <td> <input type='text' value={row.name} onChange={(e) => onUpdate({key:'name', value: e.target.value})}/> </td>
        <td> <input type='text' value={row.role} onChange={(e) => onUpdate({key:'role', value: e.target.value})}/> </td>
        <td> <input type='text' value={row.country} onChange={(e) => onUpdate({key:'country', value: e.target.value})} /> </td>
        <td ></td>
    </tr>
)};

const AddRow = ({onSave}) => {
    let row = {};
    let _ref ;
    return (
        <tr ref={(ref) => _ref = ref}>
            <td> <input id='name' type='text' onChange={(e) => { row['name'] = e.target.value; }}/> </td>
            <td> <input id='role' type='text'  onChange={(e) => row['role'] = e.target.value}/> </td>
            <td> <input id='country' type='text'  onChange={(e) => row['country'] = e.target.value}/> </td>
            <td ><button type="button" onClick={(e) => {   console.log('_ref', findDOMNode(_ref)); onSave(row) }}>Add</button></td>
        </tr>
    )};

export default Table;

const TableContainer = styled.table`
    width: 100%;
    height: 100%;
    margin: 20px;
    padding: 10px;
    tbody {
        display: flex;
        flex-direction: column;
    }
    tr {
        display: flex;
        align-items: center;
        padding: 5px;
        border: 5px solid lightblue;
    }
    tr > td {
        display: flex;
        flex: 1;
    }
    tr > th {
        color: blue;
        display: flex;
        flex: 1;
    }
    td > button {
        margin: 2px 3px;
        display: flex;
        flex: 1;
        background-color: lightblue;
    }
`;
