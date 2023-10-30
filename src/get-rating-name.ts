export default function getRatingName(rating: number){
  let ratingName: string;

  if (rating === 10) {
    ratingName = 'Awesome';
  } else if (rating > 8) {
    ratingName = 'Very good';
  } else if (rating > 5) {
    ratingName = 'Good';
  } else if (rating > 3) {
    ratingName = 'Normal';
  } else {
    ratingName = 'Bad';
  }
  return ratingName;
}

