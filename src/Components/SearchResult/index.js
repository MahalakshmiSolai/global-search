import React from "react";
import { List, Avatar, Spin, Button } from 'antd';

import "./index.css";
import { Link } from "react-router-dom";

export default function({ result: { numFound, docs }, isLoading }) {
    const onView = partialUrl => {
        window.open(`http://openlibrary.org/${partialUrl}`);
    }
    return(
        <List>
            {numFound > 0 && docs.map((doc, i) => <List.Item key={i}>
                    <List.Item.Meta
                        avatar={<Avatar src="https://openlibrary.org/static/images/categories/biographies.svg" />}
                        title={<>
                                <Link to={`/detail/${i}`}>{doc.title}</Link>{" "}
                                <span className="badge badge-info">Year: {doc.first_publish_year}</span>
                            </>
                        }
                        description={`Published By: ${doc.publisher ? doc.publisher.join(" ,") : ""}`}
                    />
                    <div>
                        <Button type="secondary" onClick={() => onView(doc.key)}>View</Button>
                    </div>
                </List.Item>
            )}
            {isLoading && <Spin className="demo-loading" />}
        </List>
    );
};
