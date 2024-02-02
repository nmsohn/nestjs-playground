import { Body, Controller, Delete, Get, NotFoundException, Param, Post, Put, Query } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { Movie } from './models/movie.entity';
import { CreateMovieDto } from './dtos/create-movie.dto';
import { UpdateMovieDto } from './dtos/update-movie.dto';

@Controller('movies')
export class MoviesController {

    constructor(private readonly moviesService: MoviesService){}

    @Get()
    getAll(): Movie[] {
        return this.moviesService.getAll();
    }

    @Get('/:id')
    getOne(@Param('id') movieId: number): Movie{
        const movie = this.moviesService.getOne(movieId);
        if(!movie) {
            throw new NotFoundException(`Movie ID ${movieId} not found`);
        }
        return movie;
    }

    @Post()
    create(@Body() movieData: CreateMovieDto){
        return this.moviesService.create(movieData);
    }

    @Put('/:id')
    update(@Param('id') movieId: number, @Body() updateData: UpdateMovieDto){
        return this.moviesService.update(movieId, updateData);
    }

    @Delete('/:id')
    remove(@Param('id') movieId: number){
        return this.moviesService.deleteOne(movieId);
    }
}