import React, { Component} from 'react';
import { Link} from 'react-router-dom';

export default class Home extends Component {

    render() {
        return (
            <div className="col-xs-12">
                <div className="col-xs-4">
                    <Link className="thumbnail" to="/campuses">
                        <img src="https://www.organicfacts.net/wp-content/uploads/2013/05/watermelon2.jpg" />
                        <div className="caption">
                            <h5>
                                <span>Campuses</span>
                            </h5>
                        </div>
                    </Link>
                </div>

                <div className="col-xs-4">
                    <Link className="thumbnail" to={"/students"}>
                        <img src="https://www.organicfacts.net/wp-content/uploads/2013/05/watermelon2.jpg" />
                        <div className="caption">
                            <h5>
                                <span>Students</span>
                            </h5>
                        </div>
                    </Link>
                </div>
            </div>
        )
    }
}
