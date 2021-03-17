import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { Card, Avatar } from 'antd';
import moment from "moment";

import "./index.css";

const { Meta } = Card;

const getImageUrl = id => {
    return id
    ?
    `http://covers.openlibrary.org/b/id/${id}-M.jpg`
    :
    "https://openlibrary.org/static/images/categories/biographies.svg"
}

const AuthersLinks = ({ currentDoc }) => {
    return currentDoc.author_name && currentDoc.author_key ?
        currentDoc.author_name.map((name, i) => <><a
            href={`http://openlibrary.org/authors/${currentDoc.author_key[i]}/${name.replace(/ /g,"_")}`} target="_blank" itemprop="author">{name}</a>{", "}</>)
            :
        "";
}

const SubjectsLinks = ({ currentDoc }) => {
    return currentDoc.subject ?
        currentDoc.subject.map((sub, i) => <><a
            href={`http://openlibrary.org/subjects/${sub}`} target="_blank" itemprop="author">{sub}</a>{", "}</>)
            :
        "";
}

<a href="/subjects/the_lord_of_the_rings">The Lord of the Rings</a>

export default function() {
    const { id } = useParams();
    const { docs } = useSelector(({ app }) => ({
        docs: app.searchResult.docs
    }));
    let currentDoc = {};
    if (docs && docs.length > 0) {
        currentDoc = docs.find((doc, i) => i === +id) || {};
        console.log(docs.find((doc, i) => i === +id));
    }
    return (<div>
        <Link to="/">Back</Link>
        <div className="d-flex details">
            <Card
                style={{ width: 200 }}
                cover={
                    <img
                        alt={currentDoc.title}
                        src={getImageUrl(currentDoc.cover_i)}
                    />
                }
            >
                <Meta
                    title={currentDoc.title}
                    description={`Published By: ${currentDoc.publisher ? currentDoc.publisher.join(" ,") : ""}`}
                />
            </Card>
            <div className="details-section">
                <p className="details-book__edition">
                    An edition of <a href={`http://openlibrary.org/${currentDoc.key}`} target="_blank">{currentDoc.title}</a> ({currentDoc.first_publish_year})
                </p>
                <h1 className="details-book__title">{currentDoc.title}</h1>
                <h2 class="edition-byline">
                    by <AuthersLinks currentDoc={currentDoc} />
                </h2>

                <div class="subject-linkbox">
                    <h6>Subjects: </h6>
                    <span><SubjectsLinks currentDoc={currentDoc} /></span>
                </div>
            </div>
            <div className="details-book__extra">
                <p>{moment(new Date(currentDoc.last_modified_i)).format("LLLL")}</p>
            </div>
        </div>
    </div>);
}
