import { Column, Table, DataType, Model, PrimaryKey, HasMany } from "sequelize-typescript";
import Book from "./Books";

@Table({ timestamps: true, tableName: "Genre" })
class Genre extends Model {
	@PrimaryKey
	@Column({ type: DataType.UUID, defaultValue: DataType.UUIDV4 })
	declare id: string;
	@Column({ type: DataType.STRING })
	declare name: string;

	@HasMany(() => Book, "bookId")
	declare books: Book[];
}

export default Genre;
