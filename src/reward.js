import React from 'react';
import { useHistory } from "react-router-dom";
import Container from '@material-ui/core/Container';
import BottomAppBar from './bottom-appbar';

export default function Reward(props) {
  let history = useHistory();

  return (
    <Container maxWidth={false} className="root-container">
        <BottomAppBar />
        <div id="shop-embed-unique-id-very-unique-nothing-is-as-unique-as-this">
           <iframe title="Reward unity modal" style={{display: 'block', width: '100%', height: '95vh'}} id="webgl_frame"
            src={`https://static.themonetizr.com/shop_embed/?token=${history.location.state.apikey}&name=${history.location.state.reward_tag}`} frameBorder="0"></iframe>
        </div>
    </Container>
    );
}
