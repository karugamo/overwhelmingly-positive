import React from 'react'
import styled from 'styled-components'
import {Category, Game, Genre} from '../types'
import {categories, genreNames} from '../const'
import Tag from './Tag'

export type Filter = {
  name: string
  function: (game: Game) => boolean
}

type FilterTagsProps = {
  onToggle: (filter: Filter) => void
  activeFilters: Filter[]
}

export default function FilterTags({onToggle, activeFilters}: FilterTagsProps) {
  const filterTagProps = {
    onToggle,
    activeFilters
  }

  return (
    <Container>
      {Object.keys(genreNames).map((genre) => (
        <FilterTag
          key={genre}
          {...filterTagProps}
          filter={createGenreFilter(Number(genre))}
        />
      ))}
      {Object.keys(categories).map((category) => (
        <FilterTag
          key={category}
          {...filterTagProps}
          filter={createCategoryFilter(Number(category))}
        />
      ))}
    </Container>
  )
}

const Container = styled.section`
  display: flex;
  flex-direction: row;
  margin-bottom: 15px;
  justify-content: flex-start;
  flex-wrap: wrap;
  max-width: 1100px;

  @media (max-width: 1200px) {
    display: none;
  }
`

function createGenreFilter(genre: Genre) {
  return {
    name: genreNames[genre],
    function: (game: Game) => game?.genres?.includes(genre)
  }
}

function createCategoryFilter(category: Category) {
  return {
    name: categories[category],
    function: (game: Game) => game?.categories?.includes(category)
  }
}

type FilterTagProps = {
  filter: Filter
  onToggle: (filter: Filter) => void
  activeFilters: Filter[]
}

function FilterTag({filter, activeFilters, onToggle}: FilterTagProps) {
  const isActive = activeFilters
    .map((filter) => filter.name)
    .includes(filter.name)

  return (
    <StyledTag inverted={isActive} onClick={() => onToggle(filter)}>
      {filter.name}
    </StyledTag>
  )
}

const StyledTag = styled(Tag)`
  margin-bottom: 7px;
`
