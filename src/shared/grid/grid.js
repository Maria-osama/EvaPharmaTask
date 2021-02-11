import React, { Component } from 'react';

import DataGrid,
{
    Column, Editing, Paging, Pager, Grouping,SearchPanel,
    Selection, ColumnFixing, Scrolling
}
    from 'devextreme-react/data-grid';

class grid extends Component {

    indexTemplate = (args) => {
        return <div id="indicator">{args.rowIndex + 1}</div>
    }

    render(){
        return(
            <DataGrid
                elementAttr={{ id: 'gridContainer' }}
                dataSource={this.props.data}
                showBorders={false}
                showColumnLines={false}
                showRowLines={false}
                allowColumnReordering={true}
                allowColumnResizing={true}
                columnResizingMode='widget'
                rowAlternationEnabled={true}
                loadPanel={{ enabled: true, showIndicator: true, showPane: true }}
                rowDragging={{ allowColumnReordering: true, showDragIcons: true }}
                showRowLines={true}

                onRowClick={(args) => this.props.onRowClicked(args)}
                onRowInserted={(args) => this.props.onRowInserted(args)}
                onRowUpdated={(args) => this.props.onEdit(args)}
                onRowRemoved={(args) => this.props.onDelete(args)}
            >
                  <Column
                        fixed={true}
                        dataField={""}
                        cellRender={this.indexTemplate}
                        width={60}
                        allowEditing={false}
                    />
                 <Column
                        fixed={true}
                        dataField={"id"}
                        allowEditing={false}
                    
                    />
                     <Column
                        fixed={true}
                        dataField={"name"}
                    />
                <SearchPanel visible={true}
                    width={240}
                    placeholder="Search..." />
                <ColumnFixing enabled={true} />
                <Selection mode="single" />
                <Grouping autoExpandAll={true} />
                <Scrolling columnRenderingMode="virtual" />
                <Editing
                    mode="row"
                    allowUpdating={true}
                    allowDeleting={true}
                    allowAdding={true} />

                <Scrolling columnRenderingMode="virtual" />
                <Paging defaultPageSize={10} />
                <Pager
                    showPageSizeSelector={true}
                    allowedPageSizes={[5, 10, 20, 100]}
                showInfo={true} />
        </DataGrid>
        )
    }
}

export default grid;