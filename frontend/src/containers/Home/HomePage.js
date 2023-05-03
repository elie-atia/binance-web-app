import React from 'react';
import { Card, CardContent, CardMedia, Typography } from '../../components/Features/Features.styles';
import Features from '../../components/Features/Features';
import {features} from '../../data/features';

const Home = () => {
 
  return (
    <div>
    <Card style={{paddingBottom:"20px"}}>
    <CardMedia
        component="img"
        height="500"
        image="static/images/home_img.jpg"
        alt="home image"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          Cryptocurrency simulation plateform (By Elie A.)
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
        In this 100% free and fun platform, you can: buy, sell, calculate your profits and compare your performance with those of other users.
        </Typography>
       
      </CardContent>
      <Features items={features}/>
    </Card>
  </div>
  );
};

export default Home;


