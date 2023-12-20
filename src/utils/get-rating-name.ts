export default function getRatingName(rating: number){
  let ratingName: string;

  if (rating === 10) {
    ratingName = 'Awesome';
  } else if (rating > 7) {
    ratingName = 'Very good';
  } else if (rating > 4) {
    ratingName = 'Good';
  } else if (rating > 2) {
    ratingName = 'Normal';
  } else {
    ratingName = 'Bad';
  }
  return ratingName;
}

