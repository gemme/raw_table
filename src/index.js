import React from 'react';
import ReactDOM from 'react-dom';
import Table from './Table';
import { DataTable } from './mocks/data';

class App extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const { name } = this.props;
        const { data } = DataTable;
        return (
        <div style={{ height: 300, width: 600 }}>
            {`Hello world: ${name} !!`}
            <Table data={data} />
        </div>)
    }

};

ReactDOM.render(<App name={'Gabriel Ernesto Manuel'}/>, document.getElementById('root'));

//console.log(((name) =>(name))('gabriel'))