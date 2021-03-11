import React, { Component } from 'react';
import './styles/main.scss';
import Tabletop from 'tabletop';
import DataTable from './DataTable';
import arrowIcon from './icon/arrow.png';
export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allData: [],
            filterData: [],
            scrollList: [],
            searchDataList: '',
            currentPage: 1,
            todosPerPage: 5,
            show: false,
            active: 'tab1',
            height: window.innerHeight,
            message: 'not at bottom',
            scrollIndex: 1,
            value:1,
        }
        this.showModal = this.showModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleScroll = this.handleScroll.bind(this);
    }

    componentDidMount() {
        Tabletop.init({
            key: '1Q_JxdXKNmlEL9cQj4UnzE7do6IVniq7EuF8wtlUC2sI',
            simpleSheet: true,
        })
            .then((data) => this.setState({ allData: data,filterData: data,scrollList: data }))
            .catch((err) => console.warn(err));
        window.addEventListener("scroll", this.handleScroll);
        
    }
    showModal = () => {
        this.setState({ show: true });
    };

    hideModal = () => {
        this.setState({ show: false });
    };

    searchData = (text) => {
        const filteredData = this.state.allData.filter((element) => {
            return element.InvoiceID.toLowerCase().includes(text.toLowerCase());
        });
        const scrollData = this.state.scrollList.filter((element) => {
            return element.InvoiceID.toLowerCase().includes(text.toLowerCase());
        });

        this.setState({
            filterData: filteredData,
            scrollList: scrollData,
        });
    };

    sortDataHandle = () => {
        const newSortData = this.state.filterData.sort((a, b) =>
            a.id > b.id ? 1 : -1
        );
        this.setState({ data: newSortData });
    };
    toggleClass = (data) => {
        this.setState({
          active: data
        });
    }
    handleClick(event) {
        this.setState({
          currentPage: event.target.id
        });
      }
      setValue(event) {
        this.setState({
          value: event
        });
      }
      gotoPage(data) {
        this.setState({
          currentPage: data
        });
      }
      
      
    handleScroll() {
        const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
        const body = document.body;
        const html = document.documentElement;
        const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
        const windowBottom = windowHeight + window.pageYOffset;
        if (windowBottom >= docHeight) {
            this.setState({
                message: 'bottom reached',
                scrollIndex: this.state.scrollIndex + 1
            });
            
        } else {
            this.setState({
                message: 'not at bottom'
            });
        }
    }
    
    render() {
        const { currentPage,scrollIndex, todosPerPage, filterData,allData,show,active,scrollList } = this.state;
        const indexOfLastTodo = currentPage * todosPerPage;
        const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
        
        const indexOfScroll = scrollIndex * todosPerPage;

        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil((filterData.length > 0 ? filterData.length : allData.length) / todosPerPage); i++) {
          pageNumbers.push(i);
        }

        const renderPageNumbers = pageNumbers.map(number => {
            var highlight = this.state.currentPage == number ? 'active' : '';
          return (
            <li
              className={`pagination-count ${highlight}`}
              key={number}
              id={number}
              onClick={this.handleClick}
            >
              {number}
            </li>
          );
        });
        
        return (
            <div className="content">
                <div className="title-wrapper">
                    <h4>Invoices</h4>
                    <div className="left-wrapper">
                        <div className="search">
                            <input
                                type="text"
                                className="search-input"
                                placeholder="Search"
                                value={this.searchDataList}
                                onChange={
                                    (e) => this.searchData(e.target.value)
                                }
                            />
                        </div>
                        <div className="switcher">
                            <div className={active === 'tab1' ? "switcher-item active" : "switcher-item"} onClick={() => this.toggleClass('tab1')}>
                                <p>Limit Offset</p>
                            </div>
                            <div className={active === 'tab2' ? "switcher-item active" : "switcher-item"} onClick={() => this.toggleClass('tab2')}>
                                <p>Infinite</p>
                            </div>
                        </div>
                    </div>
                </div>
                {active === 'tab1' ? (
                    <div>
                        <DataTable
                            data={filterData.length > 0 ? filterData.slice(indexOfFirstTodo, indexOfLastTodo) : allData.slice(indexOfFirstTodo, indexOfLastTodo)}
                            sortDataHandle={this.sortDataHandle}
                            showModal={this.showModal}
                            hideModal={this.hideModal}
                            show={show}
                        />
                        <div className="bottom-wrapper">
                            <ul className="pagination">
                                {renderPageNumbers}
                            </ul>
                            <div className="page-jump">
                                <h4>Go to page</h4>
                                <input type="number" min="1" max="3" onChange={(e)=> this.setValue(e.target.value)}/>
                                <button type="button" onClick={()=> this.gotoPage(this.state.value)}>Go <img src={arrowIcon} className="icon" alt="arrow"/></button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div>
                        <DataTable
                            data={scrollList.slice(0, indexOfScroll)}
                            sortDataHandle={this.sortDataHandle}
                            showModal={this.showModal}
                            hideModal={this.hideModal}
                            show={show}
                        />
                    </div>
                )}
                
            </div>
        );
    }
}
