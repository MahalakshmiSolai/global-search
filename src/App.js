import { Layout, Input } from 'antd';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./App.css";
import { updateSearchResult } from "./store/action";
import Details from './Components/Details';
import SearchResult from "./Components/SearchResult";

const { Header, Content, Footer } = Layout;
const { Search } = Input;

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [searchResult, setSearchResult] = useState({});
  const dispatch = useDispatch();
  const onSearch = value => {
    if (value) {
      setIsLoading(true);
      fetch(`http://openlibrary.org/search.json?q=${value}`)
        .then(res => res.json())
        .then(res => {
          console.log(res);
          setSearchResult(res);
          dispatch(updateSearchResult(res));
          setIsLoading(false);
        })
        .catch(err => {
          console.error(err);
          setIsLoading(false);
        });
    }
  };

  return (
    <Router>
      <Layout className="layout">
        <Header>
          <div className="logo">Global Search</div>
        </Header>
        <Content style={{ padding: '0 50px' }}>
          <div className="site-layout-content">
            <Switch>
              <Route exact path="/">
                <Search
                  placeholder="input search text"
                  allowClear
                  enterButton="Search"
                  size="large"
                  onSearch={onSearch}
                  loading={isLoading}
                />
                <SearchResult
                  result={searchResult}
                  isLoading={isLoading}
                />
              </Route>
              <Route exact path="/detail/:id">
                <Details />
              </Route>
            </Switch>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Global Search ©2021</Footer>
      </Layout>
    </Router>
  );
}

export default App;
