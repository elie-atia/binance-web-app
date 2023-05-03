import { GridContainer, GridItem, Card, CardMedia, CardContent, Typography } from './Features.styles';

const Features = (props) => {
    const {items} = props;
  return (
    <GridContainer spacing={2}>
      {items.map((fonctionnalite, index) => (
        <GridItem xs={5} sm={6} md={4} lg={4} spacing={10} key={index}>
        <Card>
            <CardMedia
              image={fonctionnalite.image} 
              title={fonctionnalite.title}
              style={{ height: 0, paddingTop: '56.25%' }}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {fonctionnalite.title}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {fonctionnalite.description}
              </Typography>
            </CardContent>
          </Card>
        </GridItem >
      ))}
    </GridContainer>
  );
}

export default Features;