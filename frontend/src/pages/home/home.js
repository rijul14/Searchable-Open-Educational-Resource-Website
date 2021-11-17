import React from "react";
import "./home.css";

export default class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            searchQuery: ''
        };
    }

    startSearch = () => {
        console.log("search clicked", this.state.searchQuery);
        this.props.history.push(`/search?q=${this.state.searchQuery}`);
    }

    updateSearchQuery = e => {
        this.setState({
            searchQuery: e.target.value
        });
    }

    checkEnter = e => {
        if (e.keyCode === 13){
            this.startSearch();
        }
    }

    render() {
        return (
            <div className="container-fluid">
                <div className = "row body">
                    <div className="bg-image">
                        <div className="bg-bg">
                            <div className="bg-text">
                                <div className="title-home">
                                    Oerinspanish <br/>
                                </div>
                                Recursos educativos de acceso libre <br/>
                                para la enseñanza del español <br/> <br/> <br/>
                                <div className="search">
                                    <input onChange={this.updateSearchQuery} onKeyDown={this.checkEnter}/>
                                    <button onClick={this.startSearch}>búsqueda</button>
                                    {/*<Link style={{color: 'inherit'}}*/}
                                    {/*      to="/search">búsqueda</Link><br/>*/}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
