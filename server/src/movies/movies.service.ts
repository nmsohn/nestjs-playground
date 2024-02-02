import { Injectable } from '@nestjs/common';
import { Movie } from './models/movie.entity';
import { CreateMovieDto } from './dtos/create-movie.dto';
import { UpdateMovieDto } from './dtos/update-movie.dto';

@Injectable()
export class MoviesService {
    private movies : Movie[] = [];

    getAll(): Movie[] {
        return this.movies;
    }

    getOne(movieId:number): Movie {
        return this.movies.find(movie => movie.id === movieId);
    }

    deleteOne(movieId: number): boolean {
        this.movies.filter(movie => movie.id !== movieId);
        return true;
    }

    create(movieData: CreateMovieDto){
        this.movies.push({
            id: this.movies.length + 1,
            ...movieData
        });
    }

    update(movieId: number, updateData: UpdateMovieDto){
        const movie = this.getOne(movieId);
        this.deleteOne(movieId);
        this.movies.push({...movie, ...updateData})
    }
}
