
import React, { useState } from 'react';
import { Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { Review } from '@/types';

interface ReviewSectionProps {
  spotId: string;
  reviews: Review[];
}

const ReviewSection: React.FC<ReviewSectionProps> = ({ spotId, reviews: initialReviews }) => {
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string>('');
  const [hoveredRating, setHoveredRating] = useState<number>(0);
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  
  const handleSubmitReview = () => {
    if (rating === 0) {
      toast.error("Please select a rating before submitting your review.");
      return;
    }
    
    if (comment.trim() === '') {
      toast.error("Please enter your review comment.");
      return;
    }
    
    const newReview: Review = {
      id: `review-${Date.now()}`,
      userId: 'user-1', // In a real app, this would be the actual user ID
      userName: 'Guest User', // In a real app, this would be the actual user name
      rating,
      comment,
      date: new Date().toISOString(),
    };
    
    setReviews([newReview, ...reviews]);
    setRating(0);
    setComment('');
    
    toast.success("Your review has been submitted successfully!");
  };
  
  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-bold">Write a Review</CardTitle>
        </CardHeader>
        
        <CardContent>
          <div className="space-y-4">
            <div className="flex flex-col space-y-2">
              <div className="text-sm font-medium">Your Rating</div>
              <div className="flex space-x-1">
                {[1, 2, 3, 4, 5].map((value) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setRating(value)}
                    onMouseEnter={() => setHoveredRating(value)}
                    onMouseLeave={() => setHoveredRating(0)}
                    className="focus:outline-none"
                  >
                    <Star
                      className={`h-6 w-6 ${
                        (hoveredRating ? value <= hoveredRating : value <= rating)
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300'
                      } transition-colors`}
                    />
                  </button>
                ))}
                <span className="ml-2 text-sm text-gray-600">
                  {rating > 0 ? `${rating} out of 5 stars` : 'Click to rate'}
                </span>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="text-sm font-medium">Your Review</div>
              <Textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Share your experience at this place..."
                className="min-h-[120px]"
              />
            </div>
            
            <Button 
              onClick={handleSubmitReview}
              className="bg-india-blue hover:bg-india-blue/90 text-white"
            >
              Submit Review
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <div className="space-y-4">
        <h3 className="text-xl font-bold">
          {reviews.length > 0 ? `${reviews.length} Reviews` : 'No Reviews Yet'}
        </h3>
        
        {reviews.map((review) => (
          <Card key={review.id} className="border border-gray-200">
            <CardContent className="pt-6">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <div className="font-semibold">{review.userName}</div>
                  <div className="text-sm text-gray-500">
                    {new Date(review.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })}
                  </div>
                </div>
                
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((value) => (
                    <Star 
                      key={value} 
                      className={`h-4 w-4 ${
                        value <= review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                      }`} 
                    />
                  ))}
                </div>
              </div>
              
              <p className="text-gray-700 mt-3">{review.comment}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ReviewSection;
