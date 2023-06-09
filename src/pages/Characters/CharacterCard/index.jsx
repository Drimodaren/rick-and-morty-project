import Card from "components/UI/Card";
import React from "react";
import { useSelector } from "react-redux";
import { getCharacterById } from "store/characters/selectors";

export default function CharacterCard({ id }) {
    const item = useSelector(state => getCharacterById(state, id));

    return (
        <Card
            url={item.url}
            title={item.name}
            description={item.species}
            info={item.info}
            image={item.image}
            id={item.id}
            type={"/characters"}
        />
    );
}
