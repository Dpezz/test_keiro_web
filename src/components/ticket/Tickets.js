import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { Table, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faEdit,
    faMinus,
    faCheck,
    faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import { all, destroy } from "../../actions/ticket";

function Tickets() {
    const item = useSelector((state) => state.ticket);
    const [error, setError] = useState();
    const dispatch = useDispatch();

    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = async () => {
        await dispatch(all());
    };

    const handleClick = async (item) => {
        try {
            await dispatch(destroy(item));
        } catch (err) {
            setError(err);
        }
    };

    return (
        <div>
            <h1>
                Tickets
                <Link to="/ticket">
                    <Button variant="outline-primary" className="float-right">
                        New
                    </Button>
                </Link>
            </h1>

            <Table striped hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>User Name</th>
                        <th>Email</th>
                        <th>Ticket Pedido</th>
                        <th>Date</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {item.tickets.map((item, key) => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.User?.name}</td>
                            <td>{item.User?.email}</td>
                            <td>
                                {item.ticket_pedido ? (
                                    <FontAwesomeIcon
                                        icon={faCheck}
                                        className="text-success"
                                    />
                                ) : (
                                    <FontAwesomeIcon
                                        icon={faMinus}
                                        className="text-danger"
                                    />
                                )}
                            </td>
                            <td>{item.createdAt}</td>
                            <td>
                                {!item.ticket_pedido ? (
                                    <div>
                                        <Link to={`/ticket/${item.id}`}>
                                            <FontAwesomeIcon icon={faEdit} />
                                        </Link>

                                        <Button
                                            variant="link"
                                            className="p-0 mb-1"
                                            onClick={() => handleClick(item)}
                                        >
                                            <FontAwesomeIcon
                                                icon={faTrashAlt}
                                                className="text-danger ml-1"
                                            />
                                        </Button>
                                    </div>
                                ) : (
                                    ""
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <p>{JSON.stringify(error)}</p>
        </div>
    );
}

export default Tickets;
